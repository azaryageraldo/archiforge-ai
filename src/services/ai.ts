import type { SystemDesignResponse } from '../types';

const SYSTEM_PROMPT = `Anda adalah seorang Arsitek Perangkat Lunak Ahli (Expert Software Architect). 
Buatlah rancangan desain sistem yang komprehensif, logis, dan mendalam berdasarkan deskripsi pengguna. 
Analisis kebutuhan dengan cermat dan berikan rekomendasi tech stack yang SESUAI DENGAN SKALA PROYEK (misalnya: jika hanya company profile, gunakan WordPress/CMS atau Laravel/PHP biasa; jika sistem interaktif dan real-time, gunakan React/Next.js/Node.js; jika heavy computation, gunakan Go/Python). Jangan selalu terpaku pada satu tech stack. Tunjukkan pemikiran engineering Anda.

SANGAT PENTING: Seluruh nilai teks di dalam JSON (penjelasan, alasan, fitur, tantangan, dll) WAJIB ditulis dalam BAHASA INDONESIA yang baku dan profesional. JANGAN gunakan Bahasa Inggris kecuali untuk istilah teknis murni (seperti nama framework, method API, atau tipe data).

PENTING: Anda HARUS mengembalikan hasilnya DALAM FORMAT JSON murni (raw JSON object) sesuai skema berikut. 
Jangan tambahkan format markdown (\`\`\`json) atau teks pengantar/penutup apapun, cukup kembalikan JSON mentah.

Skema Wajib (Ikuti persis seperti ini):
{
  "system_overview": "string (Penjelasan ringkas tentang apa sistem ini dan tujuan utamanya)",
  "features": ["string", "string"],
  "architecture": {
    "frontend": "string",
    "backend": "string",
    "database": "string",
    "deployment": "string",
    "rationale": "string (Jelaskan MENGAPA stack ini dipilih secara arsitektural dan mengapa cocok dengan skala proyek ini)"
  },
  "database_schema": [
    {
      "table": "string",
      "fields": [
        {
          "name": "string",
          "type": "string",
          "relation": "string (Opsional: penjelasan relasi, misal 'Foreign Key ke users.id')"
        }
      ]
    }
  ],
  "api_endpoints": [
    {
      "method": "string (GET/POST/PUT/DELETE)",
      "endpoint": "string",
      "description": "string",
      "status_code": 200,
      "example_response": "string (Contoh respons singkat)"
    }
  ],
  "system_flow": [
    "string (Contoh: 1. User login mengirim kredensial ke /api/login)",
    "string (2. Server memvalidasi dan mengembalikan JWT...)"
  ],
  "trade_offs": [
    {
      "decision": "string (Keputusan teknis, misal: 'Menggunakan NoSQL')",
      "pros": ["string"],
      "cons": ["string"]
    }
  ],
  "challenges": ["string", "string (Potensi bottleneck, isu security, atau masalah scaling)"],
  "ai_insights": "string (Analisis mendalam, saran arsitektural tingkat lanjut, atau praktik terbaik engineer untuk proyek spesifik ini)"
}`;

// Fungsi untuk mengekstrak JSON dari teks AI jika AI bandel memberikan markdown
const extractJSON = (text: string): SystemDesignResponse => {
  try {
    // Cari index kurung kurawal pertama dan terakhir untuk mengabaikan teks pembuka/penutup dari AI
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("AI tidak mengembalikan struktur objek JSON.");
    }
    
    const jsonStr = text.substring(firstBrace, lastBrace + 1);
    return JSON.parse(jsonStr) as SystemDesignResponse;
  } catch (error) {
    console.error("Gagal mengurai JSON. Teks mentah dari AI:", text);
    throw new Error("Gagal mengurai respons AI sebagai JSON. Sistem AI membalas dengan format yang salah. Silakan coba klik 'Buat Desain' lagi.");
  }
};

// 1. Panggil Gemini (Utama)
async function callGemini(prompt: string, apiKey: string): Promise<SystemDesignResponse> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: `${SYSTEM_PROMPT}\n\nPermintaan Pengguna:\n${prompt}` }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    })
  });

  if (!response.ok) throw new Error(`Gemini Error: ${response.statusText}`);
  
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) throw new Error("Respons Gemini kosong");
  return extractJSON(text);
}

// 2. Panggil OpenRouter (Fallback)
async function callOpenRouter(prompt: string, apiKey: string): Promise<SystemDesignResponse> {
  const url = 'https://openrouter.ai/api/v1/chat/completions';
  
  // Menggunakan model Auto-Router yang langsung memilih AI gratis terbaik
  const model = 'openrouter/free';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin, 
        'X-Title': 'ArchiForge AI'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { 
            role: 'user', 
            content: `${SYSTEM_PROMPT}\n\nPermintaan Pengguna:\n${prompt}` 
          }
        ]
      })
    });

    if (!response.ok) {
      // Kita telan error JSON parsing dari OpenRouter agar tidak bocor ke console, lalu lemparkan pesan yang bersih
      await response.json().catch(() => ({}));
      throw new Error(`Koneksi AI Sibuk (Status: ${response.status}). Mohon coba beberapa saat lagi.`);
    }
    
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    
    if (!text) throw new Error("AI tidak merespons. Silakan coba lagi.");
    return extractJSON(text);

  } catch (err: any) {
    // Melemparkan error bersih tanpa console.warn / console.error berlebihan
    throw new Error(err.message || "Gagal menghubungi layanan AI cadangan.");
  }
}

// Ekspor Fungsi Utama
export async function generateSystemDesign(prompt: string): Promise<SystemDesignResponse> {
  // Ambil API Key dari environment variables (didefinisikan di .env.local)
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!GEMINI_API_KEY && !OPENROUTER_API_KEY) {
    throw new Error("API Key tidak ditemukan. Harap tambahkan VITE_GEMINI_API_KEY atau VITE_OPENROUTER_API_KEY di file .env.local Anda.");
  }

  // Coba Gemini Pertama
  if (GEMINI_API_KEY) {
    try {
      return await callGemini(prompt, GEMINI_API_KEY);
    } catch (geminiError) {
      // Jika gagal, dan ada OpenRouter Key, gunakan OpenRouter secara diam-diam
      if (OPENROUTER_API_KEY) {
        return await callOpenRouter(prompt, OPENROUTER_API_KEY);
      }
      
      // Jika gagal dan tidak ada OpenRouter Key, kembalikan pesan error yang ramah
      throw new Error("Sistem AI Utama sedang sibuk (Too Many Requests). Mohon tunggu beberapa detik lalu coba lagi.");
    }
  }

  // Jika tidak punya Gemini Key, langsung pakai OpenRouter
  return await callOpenRouter(prompt, OPENROUTER_API_KEY);
}

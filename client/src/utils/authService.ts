const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export interface AuthResponse {
  token: string;
  role: string;
  userId: string;
}

export interface ProgressData {
  id: string;
  title: string;
  audioUrl: string;
  openedAt: string | null;
  downloadedAt: string | null;
}

export interface ChildProgress {
  childId: string;
  fullName: string;
  played: number;
  downloaded: number;
  progressPercent: number;
}

export interface AudioFile {
  id: string;
  title: string;
  description?: string;
  audioUrl: string;
}

// Helper function to convert relative URL to absolute
const getAbsoluteUrl = (url: string): string => {
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads") || url.startsWith("/assets")) {
    return `${API_URL}${url}`;
  }
  return `${API_URL}${url}`;
};

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  register: async (email: string, password: string, fullName: string, role: string): Promise<AuthResponse> => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName, role })
    });
    if (!res.ok) throw new Error("Registration failed");
    const data = await res.json();
    return { token: "", ...data };
  },

  getMyProgress: async (token: string): Promise<ProgressData[]> => {
    const res = await fetch(`${API_URL}/me/progress`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch progress");
    const data = await res.json();
    return data.map((item: any) => ({
      ...item,
      audioUrl: getAbsoluteUrl(item.audioUrl)
    }));
  },

  getTeacherChildrenProgress: async (token: string) => {
    const res = await fetch(`${API_URL}/teacher/children-progress`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch children progress");
    return res.json();
  },

  getParentChildrenProgress: async (token: string) => {
    const res = await fetch(`${API_URL}/parent/children-progress`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch children progress");
    return res.json();
  },

  saveToken: (token: string, role: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
  },

  getToken: () => localStorage.getItem("token"),
  getRole: () => localStorage.getItem("role"),
  getUserId: () => localStorage.getItem("userId"),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  },

  isAuthenticated: () => !!localStorage.getItem("token"),
};

export const getAudioFiles = async (): Promise<AudioFile[]> => {
  const res = await fetch(`${API_URL}/audio`);
  if (!res.ok) throw new Error("Failed to fetch audio files");
  const data = await res.json();
  
  return data.map((audio: any) => ({
    ...audio,
    audioUrl: getAbsoluteUrl(audio.audioUrl)
  }));
};

export const getImages = async (token: string) => {
  const res = await fetch(`${API_URL}/images`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch images");
  const data = await res.json();
  
  return data.map((image: any) => ({
    ...image,
    imageUrl: getAbsoluteUrl(image.imageUrl)
  }));
};

export const uploadAudio = async (token: string, file: File, title: string, description?: string) => {
  const formData = new FormData();
  formData.append("audio", file);
  formData.append("title", title);
  if (description) formData.append("description", description);

  const res = await fetch(`${API_URL}/teacher/upload-audio`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
    body: formData
  });
  if (!res.ok) throw new Error("Failed to upload audio");
  return res.json();
};

export const uploadImage = async (token: string, file: File, title: string, description?: string) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  if (description) formData.append("description", description);

  const res = await fetch(`${API_URL}/teacher/upload-image`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
    body: formData
  });
  if (!res.ok) throw new Error("Failed to upload image");
  return res.json();
};

export const markAudioOpened = async (token: string, audioId: string) => {
  const res = await fetch(`${API_URL}/audio/mark-opened`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ audioId })
  });
  if (!res.ok) throw new Error("Failed to mark audio");
  return res.json();
};

export const markAudioDownloaded = async (token: string, audioId: string) => {
  const res = await fetch(`${API_URL}/audio/mark-downloaded`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ audioId })
  });
  if (!res.ok) throw new Error("Failed to mark audio");
  return res.json();
};

export const getAllStudents = async (token: string) => {
  const res = await fetch(`${API_URL}/teacher/all-students`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
};

export const getTeacherAssignments = async (token: string) => {
  const res = await fetch(`${API_URL}/teacher/assignments`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch assignments");
  return res.json();
};

export const teacherAssignAudio = async (token: string, audioId: string, studentId: string) => {
  const res = await fetch(`${API_URL}/teacher/assign-audio`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ audioId, studentId })
  });
  if (!res.ok) throw new Error("Failed to assign audio");
  return res.json();
};

export const removeAudioAssignment = async (token: string, audioId: string, studentId: string) => {
  const res = await fetch(`${API_URL}/teacher/remove-assignment`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ audioId, studentId })
  });
  if (!res.ok) throw new Error("Failed to remove assignment");
  return res.json();
};

export const linkParentChild = async (token: string, childEmail: string) => {
  const res = await fetch(`${API_URL}/parent/link-child`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ childEmail })
  });
  if (!res.ok) throw new Error("Failed to link child");
  return res.json();
};

export const getAllParents = async (token: string) => {
  const res = await fetch(`${API_URL}/teacher/all-parents`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch parents");
  return res.json();
};

// New function for ESP32 child token
export const getChildToken = async (token: string) => {
  const res = await fetch(`${API_URL}/child/token`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to get child token");
  return res.json();
};
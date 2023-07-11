import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

export default function ClientPage() {
  const router = useRouter();

  useEffect(() => {
    // Eksekusi script atau operasi lain yang Anda inginkan

    // Contoh: Redirect ke halaman lain setelah 3 detik
    const redirectTimer = setTimeout(() => {
      signIn("github");
      router.push('/apps/pkk/list');
    }, 3000);

    // Membersihkan timer saat komponen di-unmount
    return () => {
      clearTimeout(redirectTimer);
    };
  }, []); // Menyertakan dependensi kosong agar efek hanya berjalan sekali saat komponen dimuat

  return null; // Komponen ini tidak memiliki tampilan, jadi mengembalikan null
}

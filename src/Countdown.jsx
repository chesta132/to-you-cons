import React, { useState, useEffect } from 'react';

const FixedCountdown = ({ targetDate }) => {
  // State untuk menyimpan sisa waktu
  const [timeRemaining, setTimeRemaining] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  // State untuk memeriksa apakah countdown sudah selesai
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Fungsi untuk menghitung sisa waktu
    const calculateTimeRemaining = () => {
      // Mengubah tanggal target menjadi timestamp
      const targetTime = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;
      
      // Jika waktu sudah habis
      if (difference <= 0) {
        setIsExpired(true);
        return;
      }
      
      // Menghitung sisa waktu dalam tahun, hari, jam, menit, dan detik
      // Kita hitung tahun dengan pendekatan rata-rata 365.25 hari per tahun
      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
      // Sisa hari setelah menghitung tahun
      const days = Math.floor(difference / (1000 * 60 * 60 * 24) % 365.25);
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({ years, days, hours, minutes, seconds });
    };
    
    // Jalankan perhitungan saat komponen dimuat
    calculateTimeRemaining();
    
    // Set interval untuk memperbarui countdown setiap detik
    const interval = setInterval(calculateTimeRemaining, 1000);
    
    // Bersihkan interval saat komponen unmount
    return () => clearInterval(interval);
  }, [targetDate]);
  
  // Fungsi untuk menambahkan nol di depan angka jika kurang dari 10
  const addLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };
  
  // Tampilan jika waktu sudah habis
  if (isExpired) {
    return <div>Countdown Selesai! Chesta akan mengupdate Website ini</div>;
  }
  
  return (
    <div className="countdown-item">
      <span className="years">{addLeadingZero(timeRemaining.years)} : </span>
      <span className="days">{addLeadingZero(timeRemaining.days)} : </span>
      <span className="hours">{addLeadingZero(timeRemaining.hours)} : </span>
      <span className="minutes">{addLeadingZero(timeRemaining.minutes)} : </span>
      <span className="seconds">{addLeadingZero(timeRemaining.seconds)}</span>
    </div>
  );
};

// Contoh penggunaan
export default function Countdown() {
  // Tentukan tanggal target: format 'YYYY-MM-DD HH:MM:SS'
  const targetDate = '2027-3-20 00:00:01';
  
  return (
    <div className="flex flex-col gap-2 font-medium text-[18px]">
      <h1>Countdown: </h1>
      <FixedCountdown targetDate={targetDate} />
    </div>
  );
};
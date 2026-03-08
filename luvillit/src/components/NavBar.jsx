import React, { useState, useEffect } from 'react';
import IllitLogoAurora from './IllitLogoAurora';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// Lấy index trong alphabet, không phân biệt hoa/thường
const charIndex = (c) => ALPHABET.indexOf(c.toUpperCase())

// Tính ký tự tiếp theo khi "quay" về phía target
const nextChar = (current, target) => {
  const ci = charIndex(current)
  const ti = charIndex(target)
  if (ci === -1 || ci === ti) return target   // space hoặc đã đến đích
  // Quay thuận chiều A→Z
  const next = (ci + 1) % 26
  return ALPHABET[next]
}

const memberNames = ['Wonhee', 'Minju', 'Moka', 'Iroha', 'Yunah', 'Members']

const Navbar = () => {
  const [memberIndex, setMemberIndex] = useState(0)
  // displayChars là mảng ký tự đang hiển thị
  const [displayChars, setDisplayChars] = useState(memberNames[0].split(''))

  // Cycle sang member tiếp theo mỗi 2s
  useEffect(() => {
    const id = setInterval(() => {
      setMemberIndex(i => (i + 1) % memberNames.length)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const target = memberNames[memberIndex].toUpperCase()
    setDisplayChars(prev => {
      const cur = prev.join('').padEnd(target.length, 'A').slice(0, target.length)
      return cur.split('')
    })

    const timers = []
    target.split('').forEach((targetChar, colIdx) => {
      let current = null

      const tick = () => {
        setDisplayChars(prev => {
          const next = [...prev]
          const curChar = next[colIdx] ?? 'A'
          const stepped = nextChar(curChar, targetChar)
          next[colIdx] = stepped
          if (stepped.toUpperCase() !== targetChar.toUpperCase()) {
            const t = setTimeout(tick, 50)
            timers.push(t)
          }
          return next
        })
      }

      // Stagger: cột sau bắt đầu muộn hơn 80ms
      const t = setTimeout(tick, colIdx * 80)
      timers.push(t)
    })

    return () => timers.forEach(clearTimeout)
  }, [memberIndex])


  return (
    <header style={{
      position: 'fixed',
      top: 20,
      left: 20,
      right: 20,
      zIndex: 1000,
    }}>
      <nav className="bg-transparent flex items-center px-10 py-6 text-[16px] uppercase tracking-widest text-white"
        style={{ fontFamily: '"Outfit Variable", Outfit, sans-serif' }}
      >

        {/* Menu bên trái */}
        <div className="flex-1 flex items-center gap-10">
          <a href="#introduct" className="hover:text-gray-300 transition-colors duration-300">
            Introduct
          </a>
          <a href="#members" className="hover:text-gray-300 transition-colors duration-300"
            style={{ display: 'inline-flex' }}>
            {displayChars.map((ch, i) => (
              <span key={i} style={{ display: 'inline-block', width: '0.9em', textAlign: 'center' }}>
                {ch}
              </span>
            ))}
          </a>
        </div>

        {/* Logo giữa */}
        <div className="flex justify-center items-center">
          <IllitLogoAurora height={36} />
        </div>

        {/* Menu bên phải */}
        <div className="flex-1 flex items-center justify-end gap-10">
          <a href="#achievement" className="hover:text-gray-300 transition-colors duration-300">
            Achievement
          </a>
          <a href="#contact" className="hover:text-gray-300 transition-colors duration-300">
            Contact
          </a>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
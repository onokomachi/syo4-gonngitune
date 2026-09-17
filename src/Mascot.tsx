import { motion, AnimatePresence } from 'motion/react';

export type MascotExpression = 'default' | 'happy' | 'thinking' | 'celebrating' | 'encouraging';

interface MascotProps {
  expression?: MascotExpression;
  size?: number;
  className?: string;
}

// ごん：ひとりぼっちの小ぎつね。物語「ごんぎつね」の主人公。
export function MascotPinto({ expression = 'default', size = 80, className = '' }: MascotProps) {
  // 顔の口の形で表情を表す
  const mouth: Record<MascotExpression, string> = {
    default:     'M44,62 Q50,66 56,62',
    happy:       'M42,61 Q50,70 58,61',
    thinking:    'M44,64 Q50,62 56,64',
    celebrating: 'M40,60 Q50,72 60,60',
    encouraging: 'M43,62 Q50,68 57,62',
  };
  const showBlush = expression === 'happy' || expression === 'celebrating';
  const armsUp    = expression === 'celebrating';

  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* しっぽ */}
      <path
        d="M78,88 Q98,84 94,64 Q91,50 76,52 Q88,58 84,70 Q80,82 68,84 Z"
        fill="#F0924A"
        stroke="#D97324"
        strokeWidth="2"
      />
      <ellipse cx="86" cy="66" rx="6" ry="9" fill="#FDF6EC" transform="rotate(-20 86 66)" />

      {/* 体 */}
      <ellipse cx="50" cy="86" rx="24" ry="18" fill="#F0924A" stroke="#D97324" strokeWidth="2" />
      <ellipse cx="50" cy="92" rx="14" ry="10" fill="#FDF6EC" />

      {/* うで */}
      {armsUp ? (
        <>
          <path d="M30,84 Q18,72 24,60" stroke="#F0924A" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M70,84 Q82,72 76,60" stroke="#F0924A" strokeWidth="7" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M28,88 Q20,86 16,78" stroke="#F0924A" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M72,88 Q80,86 84,78" stroke="#F0924A" strokeWidth="7" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* 耳 */}
      <path d="M27,32 L20,8 L42,26 Z" fill="#F0924A" stroke="#D97324" strokeWidth="2" strokeLinejoin="round" />
      <path d="M73,32 L80,8 L58,26 Z" fill="#F0924A" stroke="#D97324" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28,26 L24,14 L36,24 Z" fill="#4A3226" />
      <path d="M72,26 L76,14 L64,24 Z" fill="#4A3226" />

      {/* 頭 */}
      <circle cx="50" cy="48" r="26" fill="#F0924A" stroke="#D97324" strokeWidth="2" />

      {/* ほお・マズル（白い部分） */}
      <path d="M50,38 Q64,40 63,54 Q60,64 50,64 Q40,64 37,54 Q36,40 50,38 Z" fill="#FDF6EC" />

      {/* 目 */}
      {expression === 'thinking' ? (
        <>
          <path d="M38,44 Q41,42 44,44" stroke="#3D2A1F" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M56,44 Q59,42 62,44" stroke="#3D2A1F" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="41.5" cy="45" r="2.8" fill="#3D2A1F" />
          <circle cx="58.5" cy="45" r="2.8" fill="#3D2A1F" />
          <circle cx="42.5" cy="44" r="1" fill="white" />
          <circle cx="59.5" cy="44" r="1" fill="white" />
        </>
      )}

      {/* 鼻 */}
      <ellipse cx="50" cy="54" rx="3.4" ry="2.6" fill="#3D2A1F" />

      {/* 口 */}
      <path d={mouth[expression]} stroke="#3D2A1F" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* ひげ */}
      <path d="M32,52 L20,50" stroke="#D97324" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M32,56 L20,58" stroke="#D97324" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M68,52 L80,50" stroke="#D97324" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M68,56 L80,58" stroke="#D97324" strokeWidth="1.4" strokeLinecap="round" />

      {/* ほっぺ */}
      {showBlush && (
        <>
          <circle cx="33" cy="52" r="4" fill="#FCA5A5" opacity="0.6" />
          <circle cx="67" cy="52" r="4" fill="#FCA5A5" opacity="0.6" />
        </>
      )}
    </svg>
  );
}

interface BubbleProps {
  message: string;
  visible: boolean;
  position?: 'top' | 'left';
}

export function SpeechBubble({ message, visible, position = 'top' }: BubbleProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: position === 'top' ? 8 : 0, x: position === 'left' ? 8 : 0 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2 }}
          className="absolute z-20 bg-white border-2 border-orange-200 rounded-2xl px-4 py-2.5 shadow-lg text-sm font-bold text-orange-700 leading-snug whitespace-nowrap"
          style={
            position === 'top'
              ? { bottom: '110%', right: '50%', transform: 'translateX(50%)' }
              : { right: '110%', top: '50%', transform: 'translateY(-50%)' }
          }
        >
          {message}
          {/* Bubble tail */}
          <span
            className="absolute"
            style={
              position === 'top'
                ? { top: '100%', left: '50%', transform: 'translateX(-50%)',
                    borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
                    borderTop: '8px solid #FED7AA' }
                : { top: '50%', left: '100%', transform: 'translateY(-50%)',
                    borderTop: '8px solid transparent', borderBottom: '8px solid transparent',
                    borderLeft: '8px solid #FED7AA' }
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

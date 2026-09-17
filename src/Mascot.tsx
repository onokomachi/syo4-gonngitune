import { motion, AnimatePresence } from 'motion/react';

export type MascotExpression = 'default' | 'happy' | 'thinking' | 'celebrating' | 'encouraging';

interface MascotProps {
  expression?: MascotExpression;
  size?: number;
  className?: string;
}

// コスモちゃん：コスモスの花の精。物語「一つの花」の象徴。
export function MascotPinto({ expression = 'default', size = 80, className = '' }: MascotProps) {
  // 花芯（顔）の口の形で表情を表す
  const mouth: Record<MascotExpression, string> = {
    default:     'M44,64 Q50,69 56,64',
    happy:       'M42,63 Q50,72 58,63',
    thinking:    'M44,66 Q50,64 56,66',
    celebrating: 'M40,62 Q50,74 60,62',
    encouraging: 'M43,64 Q50,70 57,64',
  };
  const showBlush = expression === 'happy' || expression === 'celebrating';
  const armsUp    = expression === 'celebrating';

  // 8枚の花びら（ピンク〜白）を中心(50,55)のまわりに配置
  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 360) / 8;
    return (
      <ellipse
        key={i}
        cx="50"
        cy="29"
        rx="9"
        ry="17"
        fill={i % 2 === 0 ? '#F9A8D4' : '#FBCFE8'}
        stroke="#F472B6"
        strokeWidth="1.2"
        transform={`rotate(${angle} 50 55)`}
      />
    );
  });

  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 葉っぱ（左右） */}
      <ellipse cx="20" cy="92" rx="11" ry="5" fill="#86EFAC" stroke="#4ADE80" strokeWidth="1" transform="rotate(-28 20 92)" />
      <ellipse cx="80" cy="92" rx="11" ry="5" fill="#86EFAC" stroke="#4ADE80" strokeWidth="1" transform="rotate(28 80 92)" />

      {/* くき */}
      <rect x="47" y="78" width="6" height="32" rx="3" fill="#4ADE80" />

      {/* 腕（くきから出る小さな葉） */}
      {armsUp ? (
        <>
          <path d="M24,80 Q14,66 22,58"  stroke="#4ADE80" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M76,80 Q86,66 78,58" stroke="#4ADE80" strokeWidth="5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M24,82 Q16,82 12,76"  stroke="#4ADE80" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M76,82 Q84,82 88,76" stroke="#4ADE80" strokeWidth="5" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* 花びら */}
      {petals}

      {/* 花芯（顔）の土台 */}
      <circle cx="50" cy="55" r="18" fill="#FDE68A" stroke="#FBBF24" strokeWidth="2" />
      <circle cx="50" cy="55" r="14" fill="#FCD34D" />

      {/* 目 */}
      {expression === 'thinking' ? (
        <>
          <path d="M40,52 Q43,50 46,52" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M54,52 Q57,50 60,52" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="43.5" cy="52" r="2.6" fill="#7C2D12" />
          <circle cx="56.5" cy="52" r="2.6" fill="#7C2D12" />
          <circle cx="44.4" cy="51.2" r="0.9" fill="white" />
          <circle cx="57.4" cy="51.2" r="0.9" fill="white" />
        </>
      )}

      {/* 口 */}
      <path d={mouth[expression]} stroke="#7C2D12" strokeWidth="2.4" strokeLinecap="round" fill="none" />

      {/* ほっぺ */}
      {showBlush && (
        <>
          <circle cx="37" cy="59" r="4" fill="#FCA5A5" opacity="0.6" />
          <circle cx="63" cy="59" r="4" fill="#FCA5A5" opacity="0.6" />
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
          className="absolute z-20 bg-white border-2 border-pink-200 rounded-2xl px-4 py-2.5 shadow-lg text-sm font-bold text-pink-700 leading-snug whitespace-nowrap"
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
                    borderTop: '8px solid #FBCFE8' }
                : { top: '50%', left: '100%', transform: 'translateY(-50%)',
                    borderTop: '8px solid transparent', borderBottom: '8px solid transparent',
                    borderLeft: '8px solid #FBCFE8' }
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

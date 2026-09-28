import { motion, AnimatePresence } from 'motion/react';

// serious は「まとめテスト」のときだけの、本気モードのごん。
export type MascotExpression = 'default' | 'happy' | 'thinking' | 'celebrating' | 'encouraging' | 'serious';

interface MascotProps {
  expression?: MascotExpression;
  size?: number;
  className?: string;
}

// 表情ごとの絵。4枚とも同じ枠で切り出してあるので、表情が変わってもごんの位置はずれない。
//   smile   … ふだん・正解したとき
//   idea    … ヒントを出すとき（ひらめき）
//   hmm     … まちがえたとき（「うーん、もう一回」）
//   serious … まとめテスト（本気モード）
const IMAGE: Record<MascotExpression, string> = {
  default: 'smile',
  happy: 'smile',
  celebrating: 'smile',
  thinking: 'idea',
  encouraging: 'hmm',
  serious: 'serious',
};

const ALT: Record<MascotExpression, string> = {
  default: 'ごん',
  happy: 'にっこりするごん',
  celebrating: 'よろこぶごん',
  thinking: 'ひらめいたごん',
  encouraging: 'うーんと考えるごん',
  serious: '本気モードのごん',
};

// ごん：ひとりぼっちの小ぎつね。物語「ごんぎつね」の主人公。
export function MascotPinto({ expression = 'default', size = 80, className = '' }: MascotProps) {
  return (
    <img
      src={`/mascot/${IMAGE[expression]}.webp`}
      alt={ALT[expression]}
      width={size}
      height={size}
      draggable={false}
      className={`select-none ${expression === 'celebrating' ? 'animate-bounce' : ''} ${className}`}
      style={{ width: size, height: size }}
    />
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

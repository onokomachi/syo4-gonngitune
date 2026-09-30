/**
 * この単元アプリだけの設定。
 *
 * 国語の読解アプリ（ごんぎつね・一つの花・アップとルーズ・白いぼうし）は、App.tsx・TitleScreen.tsx・
 * lib/・scripts/ を共通にして、単元ごとにちがうものを **このファイルと data.ts だけ** に置く。
 * 1つのアプリで直したことを、ファイルをコピーするだけでほかのアプリにも入れられるようにするため。
 */

export const UNIT = {
  /** 学級ポータルの app_id（カタログ・apps テーブルと一致させる）。localStorage のキーの頭にも使う */
  appId: 'gongitsune',
  title: 'ごんぎつね',
  /** タイトル画面の大きな文字。accent の部分だけ色を付ける */
  titleMain: 'ごん',
  titleAccent: 'ぎつね',
  author: '新美 南吉',
  publisher: '光村図書 国語 4年',
  url: 'https://syo4-gonngitune.vercel.app',
  /** マスコットの呼び名（吹き出しの説明などに使う） */
  mascotName: 'ごん',
  /** 物語文なら「場面」、説明文なら「だん落」 */
  sceneWord: '場面',
  /** 使い方の1枚目 */
  onboardingHello: 'ひとりぼっちの小ぎつね「ごん」がいっしょに学ぶよ。まちがえても大丈夫！ヒントを出してくれるから、あきらめないでね。',
} as const;

/** 場面の区切り（物語の展開）。data.ts の structure[].section のキー */
export const SECTIONS: Record<string, { label: string; card: string; badge: string; text: string }> = {
  mischief: { label: 'いたずら', card: 'border-orange-300 bg-orange-50', badge: 'bg-orange-500 text-white', text: 'text-orange-600' },
  grief: { label: 'かなしみ', card: 'border-slate-400 bg-slate-50', badge: 'bg-slate-500 text-white', text: 'text-slate-600' },
  atonement: { label: 'つぐない', card: 'border-emerald-400 bg-emerald-50', badge: 'bg-emerald-500 text-white', text: 'text-emerald-600' },
  irony: { label: 'すれちがい', card: 'border-amber-400 bg-amber-50', badge: 'bg-amber-500 text-white', text: 'text-amber-600' },
  tragedy: { label: '悲しい結末', card: 'border-rose-400 bg-rose-50', badge: 'bg-rose-500 text-white', text: 'text-rose-600' },
};

/** 場面マップの見出し */
export const STRUCTURE = {
  title: '場面の組み立てマップ',
  tag: '時の流れで読む',
  intro: '物語の場面のはたらきを見てみよう。カードをタップすると、左の本文へジャンプし、読みどころが開くよ。',
};

/** 心情カードの見出し（data.ts の structure[].feeling.who のキー） */
export const WHO_LABEL: Record<string, string> = {
  gon: 'ごん',
  hyoju: '兵十',
  kasuke: '加助',
  theme: '物語のテーマ',
};

/**
 * 対比表（2×2）。data.ts の contrastChips[].correctCell は `${行のkey}-${列のkey}` か 'distractor'。
 * summary の **〜** は太字で出す。
 */
export const CONTRAST = {
  title: 'いたずら ⇄ つぐない 対比表',
  guide: '「ごんの気持ち」と「兵十の受け止め方」が、いたずらの場面とつぐないの場面でどうちがうか整理しよう。',
  rows: [
    { key: 'mischief', label: 'いたずら', cls: 'text-orange-700 bg-orange-100' },
    { key: 'atonement', label: 'つぐない', cls: 'text-emerald-700 bg-emerald-100' },
  ],
  cols: [
    { key: 'gon', label: 'ごんの\n気持ち', cls: 'text-amber-700 bg-amber-50', border: 'border-amber-200' },
    { key: 'hyoju', label: '兵十の\n受け止め方', cls: 'text-indigo-700 bg-indigo-50', border: 'border-indigo-200' },
  ],
  summaryTitle: '完成！この物語の主題は——',
  summary: 'ごんは、いたずらのときは**軽い気持ち**だったが、その後は兵十のために**つぐない**を続けた。でも、その思いは兵十に届かず、兵十は**「神様のしわざ」**だと思いこんでしまう。ごんの気持ちと兵十の受け止め方の**「すれちがい」**こそが、この物語のいちばん切ないところ。',
};

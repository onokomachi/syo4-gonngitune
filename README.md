<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ごんぎつね 学習アプリ

小学4年 国語（光村図書）の物語文「ごんぎつね」（新美南吉）を学習するための React アプリです。

## 使い方（3つの入口）

| 入口 | いつ使うか | 中身 |
|---|---|---|
| きょう読んだ場面の問題 | 授業の後半 | 場面一〜六をえらぶと、その場面の問題が「ことばの意味 → ようす・できごと → 気持ちとわけ → うつりかわり・情景 → まとめ・考え」の順に出る |
| まとめテスト | 単元の終わり・テスト前 | 全場面から10問・ヒントなし。終わると読みの力ごとに「いくつできたか」と、次に練習する力・読み直す場面が出る |
| ふりかえり | 次の日以降 | まちがえた問題。まちがいの多い読みの力から先に出る |

ほかに「読む／漢字／場面／対比」の各モードで本文を読み深められます。

## 問題の作り（src/data.ts）

- 41問（選択28・ぬき出し10・記述3）。どの問題にも**読みの力**（`skill`）を1つ付けている
- 選択問題のまちがいの選択肢には、どれも**読みまちがいの型**（`misread`：想像で決める／ほかの場面とまぜる／人物のとりちがえ／一部分だけで決める）を付けている。まちがえた子には、その型に合った「読み方のコツ」を出す
- 記述問題は自動採点できないので、解答例と「ここが書けていればOK」を見くらべて、子どもが自分で「書けた／もう少し」を決める（書いた文はサーバに送らない）
- 設問の `id` は学習記録の記号（`q-<id>`）なので、一度付けた番号は変えない

## コマンド

| | |
|---|---|
| `npm run verify` | 問題データの機械チェック（本文との照合・正解位置のかたより・読みまちがいの型の付け忘れ など） |
| `npm run catalog` | 学級ポータル用のカタログを `../learning-app-kit/src/catalog/gongitsune.ts` に書き出す |
| `npm run check` | 型チェック → データチェック → ビルド |

問題を足したり直したりしたら `npm run catalog` → learning-app-kit にコミット → このアプリ・PRISM・ハブの learning-app-kit の版を上げる。

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

const OpenAI = require('openai');

const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.static("front"));

const openai = new OpenAI({
  apiKey: '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', 
});


async function main() {

  app.get("/api/getData", async (req, res) => {
    const searchText = req.query.search;    // api/getData?search=[여기있는 변수 추출]  (search도 변수명임 보낼때 서치로 보내서 받을때도 같은 텍스트로 받음)
     
    if (!searchText) {
      res.status(400).json({ error: "검색어를 입력해주세요." });
      return;
    }
    
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: '당신은 명언 제조기 입니다. 사 자의 입력에 따라 그에 해당하는 한 줄짜리 명언만을 대답해야합니다. 명언은 최대한 짧게 만들어야 합니다.' },
        { role: 'user', content: searchText }
      ],
      model: 'gpt-3.5-turbo',
    });
  
    res.json({ result: completion.choices[0].message.content }); // 클라이언트에 데이터 전송
  });

}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

main();
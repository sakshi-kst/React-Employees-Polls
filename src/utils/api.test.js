import { getInitialData, saveQuestion, saveQuestionAnswer } from "./api";

describe("getInitialData", () => {
  it("will load initial data", async () => {
    const { users, questions } = await getInitialData();

    expect(users).toBeDefined();
    expect(questions).toBeDefined();
  });
});


describe("saveQuestion", () => {
  it("will save the question", async () => {
    const author = "author123";
    const optionOneText = "Option 1";
    const optionTwoText = "Option 2";
    const question = await saveQuestion({
      author,
      optionOneText,
      optionTwoText,
    });

    expect(question).toBeDefined();
  });
});


describe("saveQuestionAnswer", () => {
  it("will save the answer to a question", async () => {
    const authUser = "tylermcginnis";
    const question_id = "6ni6ok3ym7mf1p33lnez";
    const answer = "optionTwo";
    const questionAnswer = await saveQuestionAnswer(authUser, question_id, answer);

    expect(questionAnswer).toBe(true);
  });
});
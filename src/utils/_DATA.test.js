import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  it("will return the saved question and populate all expected fields", async () => {
    const author = "author123";
    const optionOneText = "Option 1";
    const optionTwoText = "Option 2";
    const question = { author, optionOneText, optionTwoText };
    const expectation = {
      author: author,
      optionOne: {
        text: optionOneText,
      },
      optionTwo: {
        text: optionTwoText,
      },
    };

    await expect(_saveQuestion(question)).resolves.toMatchObject(expectation);
  });

  it("will return an error", async () => {
    await expect(_saveQuestion({})).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});


describe("_saveQuestionAnswer", () => {
  it("will verify that true is returned when correct data is passed", async () => {
    const authUser = "tylermcginnis";
    const question_id = "6ni6ok3ym7mf1p33lnez";
    const answer = "optionTwo";
    const questionAnswer = { authUser, question_id, answer };

    await expect(_saveQuestionAnswer(questionAnswer)).resolves.toBe(true);
  });

  it("will return an error", async () => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual(
      "Please provide authUser, question_id, and answer"
    );
  });
});
import { addQuestion, ADD_QUESTION  } from "./questions";
  
describe("addQuestion", () => {
    it("will create an action of type: " + ADD_QUESTION, () => {
      const question = { question: "question" };
      const expectation = {
        type: ADD_QUESTION,
        question,
      };
  
      expect(addQuestion(question)).toEqual(expectation);
    });
});
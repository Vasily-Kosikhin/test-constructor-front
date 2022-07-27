import $api from '../http';

import { apiAnswerLinks, apiQuestionLinks } from '../utils/constants';

export async function saveQuestion(answer, question, currentPage) {
  try {
    await $api.put(apiQuestionLinks.update, {
      id: question[currentPage]._id,
      description: question[currentPage].description,
      inputType: question[currentPage].inputType
    });

    for (let ans of answer) {
      await $api.put(apiAnswerLinks.update, {
        id: ans._id,
        value: ans.value,
        correct: ans.correct
      });
    }
  } catch (error) {}
}

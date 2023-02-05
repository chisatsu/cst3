// �v�f���擾
const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
 
// �萔
const quizData = [
  {
      question: "Which language runs in a web browser?",
      a: "Java",
      b: "C",
      c: "Python",
      d: "JavaScript",
      correct: "d",
  },
  {
      question: "What does CSS stand for?",
      a: "Central Style Sheets",
      b: "Cascading Style Sheets",
      c: "Cascading Simple Sheets",
      d: "Cars SUVs Sailboats",
      correct: "b",
  },
  {
      question: "What does HTML stand for?",
      a: "Hypertext Markup Language",
      b: "Hypertext Markdown Language",
      c: "Hyperloop Machine Language",
      d: "Helicopters Terminals Motorboats Lamborginis",
      correct: "a",
  },
  {
      question: "What year was JavaScript launched?",
      a: "1996",
      b: "1995",
      c: "1994",
      d: "none of the above",
      correct: "b",
  },
];
 
let currentQuiz = 0
let score = 0
 
loadQuiz()
 
// �N�C�Y��\������
function loadQuiz() {
  deselectAnswers()
 
  const currentQuizData = quizData[currentQuiz]
 
  questionEl.innerText = currentQuizData.question
  a_text.innerText = currentQuizData.a
  b_text.innerText = currentQuizData.b
  c_text.innerText = currentQuizData.c
  d_text.innerText = currentQuizData.d
}
 
// �I��������
function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false)
}
 
// �񓚎擾
function getSelected() {
  let answer
 
  answerEls.forEach(answerEl => {
      // ���W�I�{�b�N�X��checked�������`�F�b�N
      if(answerEl.checked) {
          // checked����������input�v�f��ID���擾
          answer = answerEl.id
      }
  })
  return answer
}
 
// Submit�{�^�����N���b�N�������ɔ���
submitBtn.addEventListener('click', () => {
  // �񓚎擾
  const answer = getSelected()
 
  // ���I���̏ꍇ�͑��M�ł��Ȃ��悤�ɂ���
  if(answer) {
      // ����`�F�b�N
      if(answer === quizData[currentQuiz].correct) {
          // �����̏ꍇ�̓X�R�A���C���N�������g
          score++
      }
 
      currentQuiz++
 
      if(currentQuiz < quizData.length) {
          // �N�C�Y�̓ǂݍ���
          loadQuiz()
      } else {
          // ���ʔ��\
          quiz.innerHTML = `
              <h2>You answered ${score}/${quizData.length} questions correctly</h2>
              <button onclick="location.reload()">Reload</button>
          `
      }
  }
})
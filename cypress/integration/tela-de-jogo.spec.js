const INPUT_PLAYER_NAME_SELECTOR = '[data-testid="input-player-name"]';
const INPUT_PLAYER_EMAIL_SELECTOR = '[data-testid="input-gravatar-email"]';
const BUTTON_PLAY_SELECTOR = '[data-testid="btn-play"]';
const HEADER_IMAGE_SELECTOR = '[data-testid="header-profile-picture"]';
const HEADER_NAME_SELECTOR = '[data-testid="header-player-name"]';
const HEADER_SCORE_SELECTOR = '[data-testid="header-score"]';
const QUESTION_CATEGORY_SELECTOR = '[data-testid="question-category"]';
const QUESTION_TEXT_SELECTOR = '[data-testid="question-text"]';
const CORRECT_ALTERNATIVE_SELECTOR = '[data-testid="correct-answer"]';
const WRONG_ALTERNATIVES_SELECTOR = '[data-testid*="wrong-answer"]';
const LOCAL_STORAGE_STATE_KEY = 'state';
const BUTTON_NEXT_QUESTION_SELECTOR = '[data-testid="btn-next"]';
const FEEDBACK_TEXT_SELECTOR = '[data-testid="feedback-text"]';

const name = 'Nome da pessoa';
const email = 'email@pessoa.com';

describe('4 - [TELA DE JOGO] Crie um _header_ que deve conter as informações da pessoa jogadora', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_NAME_SELECTOR);
  });

  it('Será validado se a imagem do Gravatar está presente no header', () => {
    cy.get(HEADER_IMAGE_SELECTOR).should('exist');
  });

  it('Será validado se o nome da pessoa está presente no header', () => {
    cy.get(HEADER_NAME_SELECTOR).contains(name);
  });

  it('Será validado se o placar zerado está presente no header', () => {
    cy.get(HEADER_SCORE_SELECTOR).contains('0');
  });
});

describe('5 - [TELA DE JOGO] Crie a página de jogo que deve conter as informações relacionadas à pergunta', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  afterEach(() => {
    const storage = Object.keys(localStorage).length;
    expect(storage).to.be.lessThan(4);
  });

  it('Será validado se a categoria da pergunta está presente', () => {
    cy.get(QUESTION_CATEGORY_SELECTOR).should('exist');
  });

  it('Será validado se o texto da pergunta está presente', () => {
    cy.get(QUESTION_TEXT_SELECTOR).should('exist');
  });

  it('Será validado se as alternativas estão presentes', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('exist');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('exist');
  });
});

describe('6 - [TELA DE JOGO] Desenvolva o jogo onde só deve ser possível escolher uma resposta correta por pergunta', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('Será validado se a quantidade de alternativas corretas é 1', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.length', 1);
  });
});

describe('7 - [TELA DE JOGO] Desenvolva o estilo que, ao clicar em uma resposta, a correta deve ficar verde e as incorretas, vermelhas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('Será validado se a cor da alternativa correta é "rgb(6, 240, 15)" ao acertar a questão', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-color', 'rgb(6, 240, 15)');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-style', 'solid');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-width', '3px');
  });

  it('Será validado se a cor das alternativas incorretas é "rgb(255, 0, 0)" ao acertar a questão', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-color', 'rgb(255, 0, 0)');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-style', 'solid');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-width', '3px');
  });

  it('Será validado se a cor da alternativa correta é "rgb(6, 240, 15)" ao errar a questão', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-color', 'rgb(6, 240, 15)');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-style', 'solid');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-width', '3px');
  });

  it('Será validado se a cor das alternativas incorretas é "rgb(255, 0, 0)" ao errar a questão', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-color', 'rgb(255, 0, 0)');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-style', 'solid');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-width', '3px');
  });
});

describe('8 - [TELA DE JOGO] Desenvolva um timer onde a pessoa que joga tem 30 segundos para responder', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('Será validado se é possível aguardar 5 segundos e responder a alternativa correta', () => {
    cy.wait(5000);
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('not.be.disabled').click();
  });

  it('Será validado se ao aguardar mais de 30 segundos para responder, todos botões estão desabilitados', () => {
    cy.wait(32000);
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('be.disabled');
  });
});

describe('9 - [TELA DE JOGO] Crie o placar com as seguintes características:', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_SCORE_SELECTOR);
  });

  afterEach(() => {
    const storage = Object.keys(localStorage).length;
    expect(storage).to.be.lessThan(4);
  });

  it('Será validado se os pontos são somados ao acertar uma questão', () => {
    const then = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click().then(() => {
      const now = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(then.player.score).to.be.lt(now.player.score);
    });
  });

  it('Será validado se os pontos não são somados ao errar uma questão', () => {
    const then = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click().then(() => {
      const now = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(then.player.score).to.be.eq(now.player.score);
    });
  });
});

describe('10 - [TELA DE JOGO] Crie um botão de \"Next\" que apareça após a resposta ser dada', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(QUESTION_TEXT_SELECTOR);
  });

  it('Será validado se o botão "Next" não é visível no início do jogo', () => {
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('not.be.visible');
  });

  it('Será validado se o botão "Next" é visível quando a pergunta é respondida corretamente', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('be.visible');
  });

  it('Será validado se o botão "Next" é visível quando a pergunta é respondida incorretamente', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('be.visible');
  });
});

describe('11 - [TELA DE JOGO] Desenvolva o jogo de forma que a pessoa que joga deve responder 5 perguntas no total', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_SCORE_SELECTOR);
  });

  afterEach(() => {
    const storage = Object.keys(localStorage).length;
    expect(storage).to.be.lessThan(4);
  });

  it('Será validado se os pontos são somados de forma correta ao acertar todas as respostas', () => {
    const before = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click().then(() => {
      const after = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(before.player.score).to.be.lt(after.player.score);
    });
  });

  it('Será validado se os pontos são somados de forma correta ao errar todas as respostas', () => {
    const before = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click().then(() => {
      const after = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(before.player.score).to.be.eq(after.player.score);
    });
  });

  it('Será validado se a pessoa usuária é redirecionada para a tela de _feedback_ após a quinta pergunta', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TEXT_SELECTOR).should('exist');
  });
});
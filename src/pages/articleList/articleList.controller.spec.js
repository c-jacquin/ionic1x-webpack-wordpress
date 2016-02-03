import PostListController from './postList.controller';
import PostListTemplate from './postList.html';

describe('PostList', () => {
  let $makeController

  beforeEach(window.angular.mocks.module(Touriscopie));
  beforeEach(inject(() => {
    makeController = () => {
      return new postController();
    };
  }));

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(PostListTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });
});

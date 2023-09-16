import { expect } from 'chai';
import * as sinon from 'sinon';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let sandbox: sinon.SinonSandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: sandbox.stub().returns('Hello World!'),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // Arrange
      const expectedResult = 'Hello World!';

      // Act
      const result = appController.getHello();

      // Assert
      expect(result).to.equal(expectedResult);
    });

    it('should call getHello method of AppService', () => {
      // Arrange

      // Act
      appController.getHello();

      // Assert
      sinon.assert.calledOnce(appService.getHello as sinon.SinonStub);
    });
  });
});

// SPDX-FileCopyrightText: 2021 Mikhail Zolotukhin <mail@genda.life>
//
// SPDX-License-Identifier: MIT

/* eslint-disable @typescript-eslint/unbound-method */

import { createMock } from "ts-auto-mock";
import { Engine } from "../engine";
import { WindowsLayout } from "../engine/layout";
import Window from "../engine/window";
import * as Action from "./action";

describe("action", () => {
  describe("focus", () => {
    let fakeEngine: Engine;
    beforeEach(() => {
      fakeEngine = createMock<Engine>({
        focusDir: jest.fn(),
        focusOrder: jest.fn(),
        currentLayoutOnCurrentSurface: jest
          .fn()
          .mockReturnValue(createMock<WindowsLayout>()),
      });
    });

    describe("up", () => {
      it("correctly executes", () => {
        const action = new Action.FocusUpperWindow(fakeEngine);

        action.execute();

        expect(fakeEngine.focusDir).toBeCalledWith("up");
      });
    });

    describe("down", () => {
      it("correctly executes", () => {
        const action = new Action.FocusBottomWindow(fakeEngine);

        action.execute();

        expect(fakeEngine.focusDir).toBeCalledWith("down");
      });
    });

    describe("left", () => {
      it("correctly executes", () => {
        const action = new Action.FocusLeftWindow(fakeEngine);

        action.execute();

        expect(fakeEngine.focusDir).toBeCalledWith("left");
      });
    });

    describe("right", () => {
      it("correctly executes", () => {
        const action = new Action.FocusRightWindow(fakeEngine);

        action.execute();

        expect(fakeEngine.focusDir).toBeCalledWith("right");
      });
    });

    describe("next", () => {
      it("correctly executes", () => {
        const action = new Action.FocusNextWindow(fakeEngine);

        action.execute();

        expect(fakeEngine.focusOrder).toBeCalledWith(1);
      });
    });

    describe("prev", () => {
      it("correctly executes", () => {
        const action = new Action.FocusPreviousWindow(fakeEngine);

        action.execute();

        expect(fakeEngine.focusOrder).toBeCalledWith(-1);
      });
    });
  });

  describe("move window", () => {
    let fakeEngine: Engine;
    let fakeCurrentWindow: Window;
    beforeEach(() => {
      fakeCurrentWindow = createMock<Window>();

      fakeEngine = createMock<Engine>({
        swapOrder: jest.fn(),
        swapDirOrMoveFloat: jest.fn(),
        currentWindow: jest.fn().mockReturnValue(fakeCurrentWindow),
      });
    });

    describe("up", () => {
      it("correctly executes", () => {
        const action = new Action.MoveActiveWindowUp(fakeEngine);

        action.execute();

        expect(fakeEngine.swapDirOrMoveFloat).toBeCalledWith("up");
      });
    });

    describe("down", () => {
      it("correctly executes", () => {
        const action = new Action.MoveActiveWindowDown(fakeEngine);

        action.execute();

        expect(fakeEngine.swapDirOrMoveFloat).toBeCalledWith("down");
      });
    });

    describe("left", () => {
      it("correctly executes", () => {
        const action = new Action.MoveActiveWindowLeft(fakeEngine);

        action.execute();

        expect(fakeEngine.swapDirOrMoveFloat).toBeCalledWith("left");
      });
    });

    describe("right", () => {
      it("correctly executes", () => {
        const action = new Action.MoveActiveWindowRight(fakeEngine);

        action.execute();

        expect(fakeEngine.swapDirOrMoveFloat).toBeCalledWith("right");
      });
    });

    describe("next", () => {
      it("correctly executes", () => {
        const action = new Action.MoveActiveWindowToNextPosition(fakeEngine);

        action.execute();

        expect(fakeEngine.swapOrder).toBeCalledWith(fakeCurrentWindow, 1);
      });
    });

    describe("prev", () => {
      it("correctly executes", () => {
        const action = new Action.MoveActiveWindowToPreviousPosition(
          fakeEngine
        );

        action.execute();

        expect(fakeEngine.swapOrder).toBeCalledWith(fakeCurrentWindow, -1);
      });
    });
  });
});

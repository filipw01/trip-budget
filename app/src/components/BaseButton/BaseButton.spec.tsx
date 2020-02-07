import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BaseButton from "./BaseButton";

describe("<BaseButton/>", () => {
  test("disables correctly", () => {
    const { getByRole, rerender } = render(
      <BaseButton clickHandler={e => e} />
    );
    const enabledButton = getByRole("button");
    expect(enabledButton).not.toHaveAttribute("disabled");
    expect(enabledButton).not.toHaveClass("cursor-not-allowed");

    rerender(<BaseButton clickHandler={e => e} disabled={true} />);
    const disabledButton = getByRole("button");
    expect(disabledButton).toHaveAttribute("disabled");
    expect(disabledButton).toHaveClass("cursor-not-allowed");
  });

  test("handles clicks properly", () => {
    const clickHandler = jest.fn((e: React.MouseEvent) => e);

    const { getByRole } = render(<BaseButton clickHandler={clickHandler} />);
    const button = getByRole("button");
    expect(clickHandler).not.toBeCalled();

    fireEvent.click(button);
    expect(clickHandler).toBeCalledTimes(1);
    
    fireEvent.click(button);
    expect(clickHandler).toBeCalledTimes(2);
  });
});

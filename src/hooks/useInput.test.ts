import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useInput } from "./useInput";

describe("useInput Hook", () => {
  test("should handle initial value and onChange", () => {
    const { result } = renderHook(() =>
      useInput({
        initialValue: "test",
        validate: () => null,
        onValidSubmit: () => {},
      }),
    );

    expect(result.current.value).toBe("test");

    act(() => {
      result.current.onChange({
        target: { value: "new value" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe("new value");
    expect(result.current.error).toBe("");
  });

  test("should handle validation error", () => {
    const { result } = renderHook(() =>
      useInput({
        initialValue: "",
        validate: (value) => (value === "" ? "Error message" : null),
        onValidSubmit: () => {},
      }),
    );

    act(() => {
      result.current.onSubmit();
    });

    expect(result.current.error).toBe("Error message");
  });

  test("should call onValidSubmit when validation passes", () => {
    const onValidSubmit = vi.fn();
    const { result } = renderHook(() =>
      useInput({
        initialValue: "valid input",
        validate: () => null,
        onValidSubmit,
      }),
    );

    act(() => {
      result.current.onSubmit();
    });

    expect(onValidSubmit).toHaveBeenCalledWith("valid input");
    expect(result.current.error).toBe("");
  });
});

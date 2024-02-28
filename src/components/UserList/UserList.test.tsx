import { render, screen, fireEvent } from "@testing-library/react";
import { UserList } from "./UserList";
import { User } from "../../models/user";

import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock data
const mockUsers: User[] = [
  { id: "1", username: "User 1" },
  { id: "2", username: "User 2" },
];

describe("UserList Component", () => {
  test("renders user list items", () => {
    const openChatroomMock = vi.fn();

    render(
      <UserList activeUsers={mockUsers} openChatroom={openChatroomMock} />,
    );

    // Assert that each user is rendered
    mockUsers.forEach((user) => {
      const userListItem = screen.getByText(user.username);
      expect(userListItem).toBeInTheDocument();
    });
  });

  test("calls openChatroom when user is clicked", () => {
    const openChatroomMock = vi.fn();

    render(
      <UserList activeUsers={mockUsers} openChatroom={openChatroomMock} />,
    );

    const userListItem = screen.queryAllByRole("button");
    fireEvent.click(userListItem[0]);

    expect(openChatroomMock).toHaveBeenCalled();

    // Simulate click on each user
    mockUsers.forEach((user) => {
      const userListItem = screen.getByText(user.username);
      fireEvent.click(userListItem);
      // Assert that openChatroom is called with the correct user
      expect(openChatroomMock).toHaveBeenCalledWith(user);
    });
  });
});

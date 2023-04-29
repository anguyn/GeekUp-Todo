const arrangeTodos = (data) => {
  const filteredTodos = [
    ...data.filter((todo) => !todo.completed).sort((a, b) => a.id - b.id),
    ...data.filter((todo) => todo.completed).sort((a, b) => a.id - b.id),
  ];
  return filteredTodos;
};

export { arrangeTodos };

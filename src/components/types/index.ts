export type todoIndexTypeProps= {
  email:string ;
  password:string
};

export type ListTodoType = {
    todo_id: string;
    description: string;
    completed: boolean;
  };
  export type TodoType = {
    description: string;
    completed: boolean;
  };
  
  export type listTodoPropsType = {
    email: string;
    password: string;
  };

 export type EditTodoPropsType = {
  email:string,
  password:string,
    todo_id: string;
    description: string;
    updatedTodos: any;
    todos: any;
  };
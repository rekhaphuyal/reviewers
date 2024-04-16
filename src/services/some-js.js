const todo={
    id: 30,
    active:false,
    title:'Eat',
  user: {
      id: 30,
     name:'Rekha'

}
}
  const {user}=todo
  const {name:username}=user
  const todo2={
    ...todo,
    user:{
        ...todo.user
    }

  }
  todo.title='update'
  console.log(todo2.user.name)
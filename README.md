# todo-react-app

### Description

This is a simple todo app built with **NextJS**, **Shadcn**, and **Swapy**. It is a simple web application that allows you to add and delete todos. It also allows you to add and delete task lists while saving your data to local storage, meaning on refresh, your data is still there.

### How To Run

In order to run the project, you need to have Node.js installed. Next, you can run the project using:

```bash
npm install
npm run dev
```

For production, you can use:

```bash
npm install
npm run build
npm run start
```

### How to Deploy

### Attributions

shadcn: https://ui.shadcn.com/
nextjs: https://nextjs.org/
localStorage: https://dev.to/collegewap/how-to-use-local-storage-in-nextjs-2l2j
Drag and Drop (Swapy): https://github.com/TahaSh/swapy/blob/main/examples/react/App.tsx

##### Link to Deployment

Add link here when the time comes.

##### Why NextJS?

So initially I tried creating the project using only React, With _create-react-app_, but I ran into issues regarding conflicting dependencies. I then went on to try Vite and React, but I also faced issues, but this time with **Tailwind**. Since I want to use **shadcn**, I decided to now use **NextJS**.

##### Issues with Swapy

Swapy is a great library for creating drag and drop divs with nice animations. However, it is still very buggy and the documentation is not the best. I tried to use it for the tasks themselves, but I kept running into issues regarding the order of the tasks after dragging them, even the state of it. I feel like I have spent too much time trying to figure out how to use it for the tasks, so for now it will be only on the task lists themselves. I also tried using Swapy for both the lists and the tasks within them, but Swapy would get confused and allowed swapping of lists and tasks, which does not make sense. 



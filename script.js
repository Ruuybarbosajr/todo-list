const btnMakeTask = document.getElementById('criar-tarefa');
const listOdd = document.getElementById('lista-tarefas');
const input = document.getElementById('texto-tarefa');
const btnDeleteAllTask = document.getElementById('apaga-tudo');
const btnDeleteMarkFinalized = document.getElementById('remover-finalizados');
const btnMoveDown = document.getElementById('mover-baixo');
const btnMoveUp = document.getElementById('mover-cima');
const btnDeleteTaskSelected = document.getElementById('remover-selecionado');
const btnSaveList = document.getElementById('salvar-tarefas');
const sectionOl = document.getElementById('section-ol');
let childreenListOdd = document.getElementsByTagName('li');
let object = {
  contentItemList: [],
  classItemList: [],
};

window.onload = onloadPage;

function onloadPage() {
  let getObject = localStorage.getItem('object');
  let newObject = JSON.parse(getObject);
  if (localStorage.length > 0) {
    for (let index = 0; index < newObject.contentItemList.length; index += 1) {
      let elementListOdd = document.createElement('li');
      elementListOdd.innerText = newObject.contentItemList[index];
      elementListOdd.className = newObject.classItemList[index];
      listOdd.appendChild(elementListOdd);
      markItemOfList(elementListOdd);
      crossOfTask(elementListOdd);
    }
  }
}

function markItemOfList(itemOfList) {
  itemOfList.addEventListener('click', (e) => {
    for (let index = 0; index < listOdd.children.length; index += 1) {
      if (listOdd.children[index].classList.contains('item-marked')) {
        listOdd.children[index].classList.remove('item-marked');
      }
    }
    e.target.classList.add('item-marked');
  });
}
// source: https://www.w3schools.com/jsref/prop_element_classlist.asp
// uso do toggle para adicionar ou retirar a class 'completed'
function crossOfTask(itemOfList) {
  itemOfList.addEventListener('dblclick', (e) => {
    e.target.classList.toggle('text-decoration-line-through');
  });
}

function makeTask() {
  btnMakeTask.addEventListener('click', () => {
    sectionOl.className =
      'container d-flex justify-content-center shadow p-3 mb-5 rounded';
    let elementListOdd = document.createElement('li');
    elementListOdd.innerText = input.value;
    listOdd.appendChild(elementListOdd);
    input.value = '';
    markItemOfList(elementListOdd);
    crossOfTask(elementListOdd);
  });
}
makeTask();

function deleteAllTasko() {
  btnDeleteAllTask.addEventListener('click', () => {
    sectionOl.classList.remove(
      'container',
      'd-flex',
      'justify-content-center',
      'shadow',
      'p-3',
      'mb-5',
      'rounded'
    );
    listOdd.innerHTML = '';
  });
}
deleteAllTasko();

function deleteTaskFinalized() {
  btnDeleteMarkFinalized.addEventListener('click', () => {
    for (let index = childreenListOdd.length - 1; index >= 0; index -= 1) {
      if (
        childreenListOdd[index].classList.contains(
          'text-decoration-line-through'
        )
      ) {
        childreenListOdd[index].remove();
      }
    }
  });
}
deleteTaskFinalized();

// source: https://www.w3schools.com/jsref/met_node_insertbefore.asp
// Uso do .insertBefore nas funções moveDown e moveUp para realocar a li para 'cima' ou para 'baixo'

function moveDown() {
  btnMoveDown.addEventListener('click', () => {
    for (let index = 0; index < listOdd.children.length; index += 1) {
      if (listOdd.children[index].classList.contains('item-marked')) {
        if (listOdd.children[index].nextSibling == null) {
        } else {
          listOdd.insertBefore(
            listOdd.children[index].nextSibling,
            listOdd.children[index]
          );
        }
        break;
      }
    }
  });
}
moveDown();

function moveUp() {
  btnMoveUp.addEventListener('click', () => {
    for (let index = 0; index < listOdd.children.length; index += 1) {
      if (listOdd.children[index].classList.contains('item-marked')) {
        if (listOdd.children[index].previousSibling == null) {
        } else {
          listOdd.insertBefore(
            listOdd.children[index],
            listOdd.children[index].previousSibling
          );
        }
      }
    }
  });
}
moveUp();

function deleteTaskSelected() {
  btnDeleteTaskSelected.addEventListener('click', () => {
    for (let index = 0; index < childreenListOdd.length; index += 1) {
      if (childreenListOdd[index].classList.contains('item-marked')) {
        childreenListOdd[index].remove();
      }
    }
  });
}
deleteTaskSelected();

function saveList() {
  btnSaveList.addEventListener('click', () => {
    for (let index = 0; index < childreenListOdd.length; index += 1) {
      object.contentItemList.push(childreenListOdd[index].innerText);
      childreenListOdd[index].classList.contains('text-decoration-line-through')
        ? object.classItemList.push('text-decoration-line-through')
        : object.classItemList.push('');
    }
    localStorage.setItem('object', JSON.stringify(object));
    object.contentItemList = [];
    object.classItemList = [];
  });
}
saveList();

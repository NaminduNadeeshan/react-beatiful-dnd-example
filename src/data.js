const data = {
    task : {
        'task-1': {id: 'task-1', content: 'Hellow'},
        'task-2': {id: 'task-2', content: 'Menation'},
        'task-3': {id: 'task-3', content: 'Men'},
        'task-4': {id: 'task-4', content: 'Manila'},
        'task-5': {id: 'task-5', content: 'View'},
        'task-6': {id: 'task-6', content: '90'}
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskId: ['task-1','task-2']
        },
        'column-2': {
            id: 'column-2',
            title: 'InProgress',
            taskId: ['task-4','task-6']
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskId: ['task-3','task-5']
        },
    },

    columnOrder: ['column-1','column-2','column-3']
};


export default data;
const KEYS = {
    students: 'students',
    studentId: 'studentId'
}

export const getStatusItems = () => ([
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
])

export const getGradeItems = () => ([
    { value: '9', label: '9'},
    { value: '10', label: '10'  },
    { value: '11', label: '11'},
    { value: '12', label: '12' }
])

export const getClassroomCollection = () => ([
    { id: '1', label: 'English Basic' },
    { id: '2', label: 'English 101' },
    { id: '3', label: 'More English' },
    { id: '4', label: 'Most English' },
    { id: '5', label: 'Advanced English' },
    { id: '6', label: 'Lekker English' },
])

export const getReligionCollection = () => ([
    { id: '1', label: 'Dog cult' },
    { id: '2', label: 'Amstel' }
])

export function insertStudent(data) {
    let students = getAllStudents();


    let cc  = JSON.stringify({
        fullName: data.fullName,
        nickname: data.nickname,
        classRoomId: data.classRoomId,
        religionId: data.religionId,
        status: data.status,
        grade: data.grade
    })

    console.log(cc)

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length'
        },
        body: cc
    };

    data = fetch(
        '/student',
        requestOptions
    ).then(response => { //console.log(response.json());
        return response.json();
    })
        .then(data => {
            console.log('Success:', data.student);
            return data.student;
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    students.push(data)

    localStorage.setItem(KEYS.students, JSON.stringify(students))
}

export function updateStudent(data) {
    let students = getAllStudents();
    let recordIndex = students.findIndex(x => x.id == data.id);
    students[recordIndex] = { ...data }
    localStorage.setItem(KEYS.students, JSON.stringify(students));
}

export function deleteStudent(id) {
    let students = getAllStudents();
    students = students.filter(x => x.id != id)
    localStorage.setItem(KEYS.students, JSON.stringify(students));
}


export function getAllStudents() {
    if (localStorage.getItem(KEYS.students) == null)
        localStorage.setItem(KEYS.students, JSON.stringify([]))
    let students = JSON.parse(localStorage.getItem(KEYS.students));
    return students.map(x => ({
        ...x
    }))
}

export function setAllStudents(data) {
    localStorage.setItem(KEYS.students, data)
}


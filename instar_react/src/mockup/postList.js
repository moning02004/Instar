/*
    Post schema
        id: int
        author: User
        content: string
        created: Date
        updated: Date

    Heart schema
        id: int
        post: Post
        author: User
        created: Date

    Comment schema
        id: int
        post: Post
        author: User
        content: string
        created: Date
*/

export const POST_LIST = [
    {
        id: 1,
        author: 1,
        content: '오늘은 여기 #부산 으로 놀러왔다!!',
        heart_size: '12',
        comment: {
            2: {
                author: 2,
                comment: '오오오오~'
            },
            3: {
                author: 3,
                comment: 'ㅋㅋㅋㅋ'
            }
        }
    },
    {
        id: 2,
        author: 1,
        content: '#부산 에서 #조개구이',
        heart_size: '1',
        comment: {
            2: {
                author: 2,
                comment: '헐'
            },
            3: {
                author: 3,
                comment: 'ㅋㅋㅋㅋ'
            }
        }
    },
    {
        id: 3,
        author: 2,
        content: '카페에서 공부 #어렵다',
        heart_size: '3',
        comment: {
            1: {
                author: 1,
                comment: '힘내'
            },
            3: {
                author: 3,
                comment: 'ㅋㅋㅋㅋ'
            }
        }
    }
];
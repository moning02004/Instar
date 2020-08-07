/*
    User
        id: int
        username: email
        password: string
        name: string
        phone: string
        email: email
        following: User; (related_name : follower)
        description: string

    UserImage
        id: int
        user: User
        image: File
        created: Date
*/
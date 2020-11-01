class App extends React.Component {
    state = {
        page: null,
        songs: {},
        song: null,
    }

    componentDidMount = () => {
        axios.get('/library').then(response => {
            this.setState({
                songs: response.data,
                page: 'banner'
            })
        })
    }

    signIn = () => {
        this.setState({
            page: 'index'
        })
    }

    index = () => {
        this.setState({
            page: 'index'
        })
    }

    delete = (event) => {
        console.log('delete: ' + event.target.value)
        axios.delete('/library/' + event.target.value).then(response => 
            this.setState({
                songs: response.data
            })
        )
    }

    open = (event) => {
        axios.get('/library/' + event.target.id).then(response => 
            this.setState({
                page: 'view',
                song: response.data
            })
        )
    }

    change = event => {
        this.setState({[event.target.id]: event.target.value})
    }

    submit = () => {
        axios.post('/library/new', this.state).then(response => 
            this.setState({
                songs: response.data
            })    
        )
    }

    edit = (event) => {
        event.preventDefault()
        console.log(event.target.id)
        axios.put('/library/' + event.target.id, this.state).then(response => 
            this.setState({
                song: response.data
            })
        )
    }

    render = () => {
        return (
            <div className="">
                <Nav
                    signIn={this.signIn}
                    page={this.state.page}
                    change={this.change}
                    submit={this.submit}
                />

                {(this.state.page === 'banner')?<Banner/>:null}

                {(this.state.page === 'index')?<Index
                    songs={this.state.songs}
                    delete={this.delete}
                    open={this.open}
                    
                />:null}

                {(this.state.page === 'view')?<View
                    song={this.state.song}
                    index={this.index}
                    change={this.change}
                    edit={this.edit}
                />:null}
            </div>
        )
    }
}

class Nav extends React.Component {
    render = () => {
        return (
            <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center justify-between lg:py-0 py-2 mb-6">
                <div className="flex felx justify-between items-center">
                    <h1><a className="text-xl lg:mb-0 mb-2" href="#" onClick={this.props.signIn}>MuSe</a></h1>
                </div>
                <label for="menu-toggle" className="cursor-pointer lg:hidden block"><svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></label>
                <input className="hidden" type="checkbox" id="menu-toggle" />

                <div className="hidden lg:flex lg:items-center justify-center lg:w-1/4 w-full" id="menu">
                    <ul className="lg:flex lg:items-center lg:w-full justify-around text-base text-gray-700">
                        <li><a className="px-0 block border-b-2 border-transparent hover:border-indigo-400 hover:no-underline lg:mb-0" href="#" onClick={this.props.signIn}>Sign In</a></li>
                        <li><a className="px-0 block border-b-2 border-transparent hover:border-indigo-400 hover:no-underline lg:mb-0" href="#">Log In</a></li>
                        <li><details>
                            <summary>New</summary>
                            <form className="flex flex-col" onSubmit={this.props.submit}>
                                <div>
                                    <label for="title">Title: </label>
                                    <input name="title" type="text" id="title" onChange={this.props.change}></input>
                                </div>
                                <div>
                                    <label for="composer">Composer: </label>
                                    <input name="composer" type="composer" id="composer" onChange={this.props.change}></input>
                                </div>
                                <div>
                                    <label for="sheetMusic">Sheet Music: </label>
                                    <input name="sheetMusic" type="sheetMusic" id="sheetMusic" onChange={this.props.change}></input>
                                </div>
                                <div>
                                    <input type="submit"/>
                                </div>
                            </form>
                        </details></li>
                    </ul>
                </div>

                
            </header>
        )
    }
}

class Banner extends React.Component {
    render = () => {
        return(
            <div className="banner flex w-11/12 m-auto h-banner mt-10">
                <h3 className="text-4xl">Practice at your own pace.</h3>
            </div>
        )
    }
}

class Index extends React.Component {
    render = () => {
        return (
            <div className="index my-6">
                {this.props.songs.map(song => {
                    return (
                        <div key={song._id} className="song bg-green-300 m-3 border-2 rounded-md border-blue-600 p-2">
                            <div className="flex align-middle justify-between">
                                <div>
                                    <h1><a className="hover:underline" id={song._id} onClick={this.props.open}>{song.title}</a></h1>
                                    <p>{song.composer}</p>
                                </div>
                                <div>
                                    <button className="bg-gray-600 border-2 border-gray-700">EDIT</button>
                                    <button className="bg-gray-600 border-2 border-gray-700" value={song._id} onClick={this.props.delete}>DELETE</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

class View extends React.Component {
    render = () => {
        return (
            <div>
                <button className="bg-gray-600 border-2 border-gray-700" onClick={this.props.index}>BACK</button>
                <details>
                    <summary>Edit</summary>
                    <form className="flex flex-col" id={this.props.song._id} onSubmit={this.props.edit}>
                        <div>
                            <label htmlFor="title">Title: </label>
                            <input name="title" type="text" id="title" placeholder={this.props.song.title} onChange={this.props.change}></input>
                        </div>
                        <div>
                            <label htmlFor="composer">Composer: </label>
                            <input name="composer" type="composer" id="composer" placeholder={this.props.song.composer} onChange={this.props.change}></input>
                        </div>
                        <div>
                            <label htmlFor="sheetMusic">Sheet Music: </label>
                            <input name="sheetMusic" type="sheetMusic" id="sheetMusic" placeholder={this.props.song.sheetMusic} onChange={this.props.change}></input>
                        </div>
                        <div>
                            <input type="submit"/>
                        </div>
                    </form>
                </details>
                <img src={this.props.song.sheetMusic}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
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
        console.log('open: ' + event.target.id)
        axios.get('/library/' + event.target.id).then(response => 
            this.setState({
                page: 'view',
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
                    return <div className="song flex align-middle justify-between bg-green-300 m-3 border-2 rounded-md border-blue-600">
                        <div>
                            <h1><a className="hover:underline" id={song._id} onClick={this.props.open}>{song.title}</a></h1>
                            <p>{song.composer}</p>
                        </div>
                        <div>
                            <button className="bg-gray-600 border-2 border-gray-700">EDIT</button>
                            <button className="bg-gray-600 border-2 border-gray-700" value={song._id} onClick={this.props.delete}>DELETE</button>
                        </div>
                        <div>
                            <form>
                                <label></label>
                                <input></input>

                                <label></label>
                                <input></input>

                                <label></label>
                                <input></input>
                            </form>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}

class View extends React.Component {
    render = () => {
        return (
            <div>
                {console.log(this.props.song)}
                <button className="bg-gray-600 border-2 border-gray-700" onClick={this.props.index}>BACK</button>
                <img src={this.props.song.sheetMusic}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
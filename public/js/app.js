class App extends React.Component {
    render = () => {
        return (
            <div className="">
                <Nav></Nav>
            </div>
        )
    }
}

class Nav extends React.Component {
    render = () => {
        return (
            <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center justify-between lg:py-0 py-2">
                <div className="flex felx justify-between items-center">
                    <h1><a className="lg:mb-0 mb-2" href="#">MuSe</a></h1>
                </div>
                <label for="menu-toggle" className="cursor-pointer lg:hidden block"><svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></label>
                <input className="hidden" type="checkbox" id="menu-toggle" />

                <div className="hidden lg:flex lg:items-center justify-center lg:w-1/4 w-full" id="menu">
                    <ul class="lg:flex lg:items-center lg:w-full justify-around text-base text-gray-700">
                        <li><a class="px-0 block border-b-2 border-transparent hover:border-indigo-400 hover:no-underline lg:mb-0" href="#">Sign In</a></li>
                        <li><a class="px-0 block border-b-2 border-transparent hover:border-indigo-400 hover:no-underline lg:mb-0" href="#">Log In</a></li>
                    </ul>
                </div>
            </header>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
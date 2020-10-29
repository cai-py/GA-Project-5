class App extends React.Component {
    render = () => {
        return (
            <div className="container">
                Hi
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
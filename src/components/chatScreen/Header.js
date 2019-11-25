import { h, Component, Fragments } from 'preact';

class Header extends Component {
    state = {
        isSearchOpen: false,
        searchText: ''
    }
    searchHandler = () => {
        this.setState((prevState, props) => ({
            isSearchOpen: !prevState.isSearchOpen
        }))
    }

    onSearchChange = (e) => {
        this.setState({ searchText: e.target.value })
    }

    render({ themeColor }, { isSearchOpen, searchText }) {
        return (
            <Fragments>
                <div className="header-block" style={{ backgroundColor: themeColor ? themeColor : "" }}>
                    <div class="user-profile">
                        <img src="images/profile.png" />
                    </div>
                    <div class="user-name-block">
                        <div class="user-name">
                            kamles mitawa
                    </div>
                        <div class="user-about">
                            about of user
                    </div>
                    </div>

                    <div class="attachments-block" onClick={this.searchHandler}>
                        <i class="fa fa-search search-icon" aria-hidden="true"></i>
                    </div>
                </div>
                {
                    isSearchOpen ?
                        <div class="search-block">
                            <input class="search-bar" name="search" value={searchText} onChange={this.onSearchChange} placeholder="Find Your Messages" />
                        </div>
                        : null
                }

            </Fragments>
        )
    }
}

export default Header
import PostModal from "../../components/PostModal/PostModal"


const HomePage = () => {

    return(
        <div>
            <div>
                <ul>
                    <li>Find friends</li>
                    <li>Most Recent</li>
                    <li>Groups</li>
                    <li>MarketPlace</li>
                    <li>Watch</li>
                    <li>Memories</li>
                    <li>Saved</li>
                </ul>
            </div>
            <div>
                <PostModal/>
            </div>
        </div>
    )
}

export default HomePage
import { Reapp, React, View, Button, Input, Gallery} from 'reapp-kit'
import Superagent from 'superagent';
import SuperagentP from 'superagent-jsonp';

//DO NOT COPY MY KEY, Thanks :)

let tag='cat';
const access_token='2212900159.1fb234f.8680b8ed745b439fb61fda3e7bdb88c0';
const searchUrl=`https://api.instagram.com/v1/tags/${tag}/media/recent?access_token=${access_token}`;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {photos: []}
  }

  handleSearch(e) {
    let self = this
    tag = this.refs.search.getDOMNode().value;
    console.log(">< searchUrl", searchUrl)

    Superagent
    .get(searchUrl).jsonp()
    .end(function(err, res){
      console.log(res);
      if (! (res.meta.code === 200 && res.data)) return;
      // Calling the end function will send the request
      self.setState({
        photos: res.data.map(function(image){
          return image.images.standard_resolution.url;
        })
      });


    })
  }

  render() {
    let { photos } = this.state;
    return (
      <View title="reapp-flicker">
        <Input ref="search" placeholder="Enter your search" styles={{
            input: {
              margin: '0 0 10px 0'
            }
          }} />
          <Button onTap={this.handleSearch.bind(this)}>Search Images</Button>
          <div className="verticalCenter">
            {!photos.length && <p>No photos!</p>}
            {!!photos.length &&
              <Gallery
                onClose={() => this.setState({ photos: [] })}
                images={photos}
                width={window.innerWidth}
                height={window.innerHeight - 44}
                />
            }
          </div>
        </View>
      )
    }
  }

  export default Reapp(App)

import React, { Component } from 'react';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import Directory from '../../components/Directory';
import CharDetails from '../../components/CharDetails';
import Loader from '../../components/Loader';
import klcDB from '../../firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isError: false,
      isLoading: false,
      courseTitle: 'KLC 2300',
      lessonTitle: null,
      lessons: null,
      lessonsDirectory: null,
      currentList: null,
      currentCharacter: null,
      currentCharacterIndex: null
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const response = await klcDB.get('/courses.json');
      const data = response.data.course_001;
      const lessons = []; const lessonsDirectory = [];

      for (let key in data.lessons) {
        lessons.push({
          characters: data.lessons[key].characters,
          name: data.lessons[key].name.value
        });
        lessonsDirectory.push(data.lessons[key].name.value);
      }

      this.setState({
        currentList: lessonsDirectory,
        lessons,
        lessonsDirectory,
        isLoading: false
      });
    } catch(error) {
      console.warn(error);
      this.setState({
        isError: true,
        isLoading: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      window.scrollTo(0, 0);
    }
  }

  // used by LessonDirectory and CharDirectory to go to next page
  goForward = index => {
    if (this.state.page === 1) {
      const currentLesson = { ...this.state.lessons[index] };
      this.setState({
        currentList: currentLesson.characters,
        lessonTitle: currentLesson.name
      });
    }
    if (this.state.page === 2) {
      const currentCharacter = { ...this.state.currentList[index] };
      this.setState({
        currentCharacterIndex: index,
        currentCharacter
      });
    }
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  }

  // used by CharDirectory and CharDetails to go to previous page
  goBack = () => {
    if (this.state.page === 2) {
      this.setState({
        currentList: [ ...this.state.lessonsDirectory ],
        lessonTitle: null
      });
    }
    if (this.state.page === 3) {
      this.setState({
        currentCharacter: null,
        currentCharacterIndex: null
      });
    }
    this.setState((prevState) => ({ page: prevState.page - 1 }));
  }

  // used by CharDetails to navigate between characters
  onNavigateCharacter = index => {
    const currentCharacterIndex = this.state.currentCharacterIndex + index;
    const currentCharacter = { ...this.state.currentList[currentCharacterIndex] };
    this.setState({
      currentCharacterIndex,
      currentCharacter
    });
  }

  render() {
    const {
      page,
      isError,
      isLoading,
      courseTitle,
      lessonTitle,
      currentList,
      currentCharacter
    } = this.state;

    return (
      <div className="App">
        <Header />
        <div className="main">
          {isError ? (
            <p>Whoops! Looks like we encountered an error. Please try again at another time.</p>
          ) : (
            <>
              <SubHeader
                courseTitle={courseTitle}
                lessonTitle={lessonTitle}
                page={page}
                goBack={this.goBack} />
              {page < 3 && currentList && (
                <Directory
                  currentList={currentList}
                  page={page}
                  goForward={this.goForward} />
              )}
              {page === 3 && (
                <CharDetails
                  currentCharacter={currentCharacter}
                  currentList={currentList}
                  onNavigateCharacter={this.onNavigateCharacter} />
              )}
            </>
          )}
        </div>
        {isLoading && <Loader />}
      </div>
    );
  }
}

export default App;
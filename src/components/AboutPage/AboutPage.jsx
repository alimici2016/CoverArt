import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h3 >Application Overview</h3>
        <p>
          This application will allow users to write down initial thoughts and/or feelings on a film as a basemode. What I find is that oftentimes, there’s a distinction between your first and second times experiencing a phenomena and a film is no exception. By having an application that captures your immediate thoughts, it works as both a time stamp as well as allowing you to down the line, formulate a more well rounded opinion on the film. This application is not interactive, it is closer to a personal journal where you can be intimate, and before you know it you’ll have a small museum of the things you value(stretch mode to incorporate more than just films).
        </p>
      </div>
    </div>
  );
}

export default AboutPage;

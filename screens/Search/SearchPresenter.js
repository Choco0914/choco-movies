import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BG_COLOR, GREY_COLOR, TINT_COLOR } from "../../constants/Colors";
import Layout from "../../constants/Layouts";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import MovieItem from "../../components/MovieItem";

const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
`;

const InputContainer = styled.View`
  align-items: center;
  margin-vertical: 20px;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  width: ${Layout.width / 1.6};
  border-radius: 20px;
  padding: 10px;
  text-align: center;
`;

const SearchResults = styled.ScrollView`
  margin-top: 20px;
`;

const ErrText = styled.Text`
  margin-top: 20px;
`;

const Cantresult = styled.Text`
  color: ${TINT_COLOR};
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

const SearchTitle = styled.Text`
  color: ${TINT_COLOR};
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

const SearchPresenter = ({
  loading,
  tvResults,
  searchTerm,
  movieResults,
  handleSearchUpdate,
  onSubmitEditing,
  error
}) => (
  <Container>
    <InputContainer>
      <Input
        onChangeText={handleSearchUpdate}
        value={searchTerm}
        returnKeyType="search"
        placeholder="영화 혹은 TV를 검색해보세요"
        placeholderTextColor={GREY_COLOR}
        onSubmitEditing={onSubmitEditing}
      />
    </InputContainer>
    <SearchResults>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrText>{error}</ErrText>
      ) : (
        <>
          {movieResults || tvResults ? (
            movieResults.length > 0 || tvResults.length > 0 ? (
              <SearchTitle>{searchTerm} 검색결과</SearchTitle>
            ) : (
              { searchTerm } && (
                <SearchTitle>아무것도 찾을수가 없습니다.</SearchTitle>
              )
            )
          ) : null}
          {movieResults ? (
            movieResults.length > 0 ? (
              <Section title="영화">
                {movieResults
                  .filter(movie => movie.poster_path !== null)
                  .map(movie => (
                    <MovieItem
                      key={movie.id}
                      id={movie.id}
                      posterPhoto={movie.poster_path}
                      title={movie.title}
                      overview={movie.overview}
                      voteAvg={movie.vote_average}
                    />
                  ))}
              </Section>
            ) : null
          ) : null}
          {tvResults ? (
            tvResults.length > 0 ? (
              <Section title="TV">
                {tvResults
                  .filter(tv => tv.poster_path !== null)
                  .map(tv => (
                    <MovieItem
                      key={tv.id}
                      id={tv.id}
                      posterPhoto={tv.poster_path}
                      title={tv.name}
                      voteAvg={tv.vote_average}
                      isMovie={false}
                    />
                  ))}
              </Section>
            ) : null
          ) : null}
        </>
      )}
    </SearchResults>
  </Container>
);

SearchPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  tvResults: PropTypes.array,
  movieResults: PropTypes.array,
  searchTerm: PropTypes.string,
  handleSearchUpdate: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired
};

export default SearchPresenter;

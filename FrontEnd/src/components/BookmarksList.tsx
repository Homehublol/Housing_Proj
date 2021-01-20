import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookmarkIcons } from '../assets/icons/all';
import { selectUser } from '../redux/slices/auth';
import {
  getHousingFavorites,
  selectHousingFavorites,
} from '../redux/slices/housing';
import Bookmark from './Bookmark';

const BookmarksList: React.FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectHousingFavorites);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getHousingFavorites());
  }, [dispatch]);

  return (
    <div className="bookmarks-list">
      <div className="d-flex justify-content-center">
        <bookmarkIcons.bookmark className="mr-2 mb-auto align-self-baseline" />
        <span className="bookmarks-list-title">Bookmarks</span>
      </div>
      <div className="bookmarks-list-bookmarks">
        {favorites &&
          // TODO this should be handled within the loader component (not yet made)
          Object.values(favorites).map((favorite) => (
            <div key={favorite.roomId} className="w-100 mb-1 px-1">
              <Bookmark {...favorite} />
            </div>
          ))}
        <div className="bookmarks-list-none-message">
          {favorites &&
            // TODO this should be handled within the loader component (not yet made)
            Object.keys(favorites).length === 0 &&
            (user
              ? 'Your bookmarked housings will appear here!'
              : 'Sign in to save your bookmarks permanently.')}
        </div>
      </div>
    </div>
  );
};

export default BookmarksList;

import React , {useEffect} from "react";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { fetchCollectionStart } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

import withSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

const ShopPage = ({fetchCollectionStart, match, isFetchingCollection, isCollectionsLoaded })=>  {
  useEffect(()=>{
    fetchCollectionStart();
  },[fetchCollectionStart]); 
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner
              isLoading={isFetchingCollection}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionsLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }

const mapStateToProps = createStructuredSelector({
  isFetchingCollection: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

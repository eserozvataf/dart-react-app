import * as React from 'react';

import appContext from '../../appContext';

import PageListView from './pageListView';
import LoadingView from '../shared/loadingView';
import ErrorView from '../shared/errorView';

interface PagesContainerPropsInterface {
}

interface PagesContainerStateInterface {
    isCompleted: boolean;
    datasource: any;
    error: string | false;
}

class PagesContainer extends React.Component<PagesContainerPropsInterface, PagesContainerStateInterface> {
    constructor(props: PagesContainerPropsInterface, context: any) {
        super(props, context);

        this.state = {
            isCompleted: false,
            datasource: null,
            error: false,
        };
    }

    componentDidMount(): void {
        this.updateDatasource();
    }

    render(): JSX.Element {
        if (this.state.error !== false) {
            console.error(this.state.error);

            return (
                <ErrorView message="An error occurred" />
            );
        }

        if (this.state.datasource === null) {
            return (
                <LoadingView />
            );
        }

        return (
            <div>
                <h1>Pages</h1>

                <PageListView datasource={this.state.datasource} datakey="pages" />
            </div>
        );
    }

    async updateDatasource(): Promise<void> {
        const pageService = appContext.get('pageService');

        try {
            const response = await pageService.getPages();

            this.setState({ isCompleted: true, datasource: response, error: false });
        }
        catch (err) {
            this.setState({ isCompleted: true, datasource: null, error: err });
        }
    }
}

export {
    PagesContainer as default,
    PagesContainerPropsInterface,
    PagesContainerStateInterface,
};

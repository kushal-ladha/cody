import React from "react";
import { Link } from "react-router-dom";
import { createFragmentContainer, graphql } from "react-relay";
import type { Repository_repository } from "./__generated__/Repository_repository.graphql";
import { ChevronRight, Folder } from "react-feather";

function Repository({
  repository,
}: {
  repository: Repository_repository;
}): JSX.Element {
  return (
    <li>
      <Link
        to={`/repos/${repository.owner}/${repository.name}`}
        className="block hover:bg-gray-50"
      >
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="flex-shrink-0">
              <Folder />
            </div>
            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <p className="text-sm font-medium truncate">{`${repository.owner}/${repository.name}`}</p>
              </div>
            </div>
            <div>
              <ChevronRight />
            </div>
          </div>
        </div>
      </Link>
    </li>
    // <div className="level box">
    //   <div className="level-left code">
    //     <div className="level-item">
    //       <strong>{`${repository.owner}/${repository.name}`}</strong>
    //     </div>
    //   </div>
    //   <div className="level-right">
    //     <div className="level-item">
    //       <Link
    //         to={`/repos/${repository.owner}/${repository.name}`}
    //         className="button"
    //         title={`${repository.owner}/${repository.name}`}
    //       >
    //         <MoreHorizontal />
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
}

export default createFragmentContainer(Repository, {
  repository: graphql`
    fragment Repository_repository on Repository {
      id
      owner
      name
    }
  `,
});

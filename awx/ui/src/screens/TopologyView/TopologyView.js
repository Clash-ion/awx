import React, { useEffect, useCallback } from 'react';

import { t } from '@lingui/macro';
import ScreenHeader from 'components/ScreenHeader/ScreenHeader';
import { PageSection, Card, CardBody } from '@patternfly/react-core';
import useRequest from 'hooks/useRequest';
import { MeshAPI } from 'api';
import MeshGraph from './MeshGraph';

function TopologyView() {
  const {
    result: { meshData },
    // error: fetchInitialError,
    request: fetchMeshVisualizer,
  } = useRequest(
    useCallback(async () => {
      const { data } = await MeshAPI.read();
      return {
        meshData: data,
      };
    }, []),
    { meshData: { nodes: [], links: [] } }
  );
  useEffect(() => {
    fetchMeshVisualizer();
  }, [fetchMeshVisualizer]);
  return (
    <>
      <ScreenHeader breadcrumbConfig={{ '/topology_view': t`Topology View` }} />

      <PageSection>
        <Card>
          <CardBody>{meshData && <MeshGraph data={meshData} />}</CardBody>
        </Card>
      </PageSection>
    </>
  );
}

export default TopologyView;

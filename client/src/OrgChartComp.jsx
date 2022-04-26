import React, { Component } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { Card, CardBody } from "reactstrap";

export class OrgChartComp extends Component {
  render() {
    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Tree
              label={
                <div>
                  <div>
                    <strong>Lider del comité central</strong>
                  </div>
                  <div>Jorge Tamaño</div>
                </div>
              }
            >
              <TreeNode
                label={
                  <div>
                    <div>
                      <strong>Coodinador</strong>
                    </div>
                    <div>Pablo Viecho</div>
                  </div>
                }
              >
                <TreeNode
                  label={
                    <div>
                      <br></br>
                    </div>
                  }
                >
                  <TreeNode label={<div>Grupo Alimentación y Extrusión</div>} />
                </TreeNode>

                <TreeNode label={<div>Mantenimiento Autonomo</div>}>
                  <TreeNode label={<div>Mantenimiento Planificado</div>} />
                </TreeNode>
                <TreeNode
                  label={
                    <div>
                      <Card className="bg-primary">
                        <CardBody>Mantenimiento Planificado</CardBody>
                      </Card>
                    </div>
                  }
                />
                <TreeNode label={<div>Mejoras Planificadas</div>} />
                <TreeNode label={<div>Seguridad y Medio Ambiente</div>} />
                <TreeNode label={<div>Capacitación y Entrenamiento </div>} />
              </TreeNode>
            </Tree>
          </div>
        </div>
      </div>
    );
  }
}

export default OrgChartComp;

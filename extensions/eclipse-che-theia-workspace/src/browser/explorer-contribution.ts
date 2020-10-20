/*********************************************************************
 * Copyright (c) 2020 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { inject, injectable } from 'inversify';
import { FrontendApplicationContribution, FrontendApplication } from '@theia/core/lib/browser';
import { CommandService } from '@theia/core/lib/common';
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';
import { FileNavigatorCommands } from '@theia/navigator/lib/browser/navigator-contribution';

@injectable()
export class ExplorerContribution implements FrontendApplicationContribution {

    @inject(FrontendApplicationStateService)
    protected readonly stateService: FrontendApplicationStateService;

    @inject(CommandService)
    protected readonly commandService: CommandService;

    async onStart(app: FrontendApplication): Promise<void> {
        this.stateService.reachedState('ready').then(
            () => this.commandService.executeCommand(FileNavigatorCommands.FOCUS.id)
        );
    }
}

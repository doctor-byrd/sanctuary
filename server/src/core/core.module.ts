import { Module } from '@nestjs/common';
import { User, SystemConfig } from '@project/shared-types';
import { TypeOrmModule } from '@nestjs/typeorm'
import { SystemConfigService } from './system.config.service';
import { ConfigurationProcessor } from './configuration.processor';
import { NotificationGateway } from './notification.gateway';
import { NotificationProcessor } from './notification.processor';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, SystemConfig])],
  providers: [
    NotificationGateway,
    SystemConfigService,
    ConfigurationProcessor,
    NotificationProcessor,
  ],
  exports: [
    EncryptionService,
    SystemConfigService,
  ]
})
export class CoreModule {}
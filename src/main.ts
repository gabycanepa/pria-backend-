import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger configuration
  const swaggerPath = 'api-docs';

  // Prevent CDN/browser caching of Swagger docs
  app.use(`/${swaggerPath}`, (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('Praia Adventure Game API')
    .setDescription('Beach-themed platformer game backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document, {
    customSiteTitle: 'Praia Adventure API',
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .info .title { color: #1a1a1a; font-size: 2.5rem; font-weight: 700; }
      .swagger-ui .info .description { color: #4a4a4a; font-size: 1.1rem; line-height: 1.6; }
      .swagger-ui { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
      .swagger-ui .opblock-tag { font-size: 1.4rem; font-weight: 600; color: #2c3e50; border-bottom: 2px solid #3498db; }
      .swagger-ui .opblock { border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 1rem; }
      .swagger-ui .opblock .opblock-summary-method { background: #3498db; border-radius: 4px; }
      .swagger-ui .btn.execute { background-color: #2ecc71; border-color: #27ae60; }
      .swagger-ui .btn.execute:hover { background-color: #27ae60; }
    `,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: true,
    },
  });

  const port = 3000;
  await app.listen(port);
  logger.log(`🚀 Server running on http://localhost:${port}`);
  logger.log(`📚 API Documentation available at http://localhost:${port}/${swaggerPath}`);
}

bootstrap();
// Trigger restart
// Trigger restart 2

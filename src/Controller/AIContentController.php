<?php

namespace Drupal\ai_module\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use function Codewithkyrian\Transformers\Pipelines\pipeline;

class AIContentController extends ControllerBase {

  /**
   * Generates AI content based on the input text.
   */
  public function generateContent(Request $request) {
    // Get the input text from the request.
    $data = json_decode($request->getContent(), TRUE);
    $inputText = $data['text'];

    // Initialize the AI content generator.
    $generator = pipeline('text2text-generation', 'Xenova/flan-t5-small');

    // Generate the AI content.
    $output = $generator($inputText);

    // Return the generated content as JSON.
    return new JsonResponse(['generated_text' => $output[0]['generated_text']]);
  }

}
